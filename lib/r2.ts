import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;

/**
 * Upload recording to Cloudflare R2
 */
export async function uploadRecording(
  file: Buffer,
  filename: string,
  bookingId: string
): Promise<{ url: string; key: string }> {
  const key = `recordings/${bookingId}/${filename}`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
      ContentType: 'video/mp4',
    })
  );

  const url = `https://${process.env.R2_PUBLIC_URL}/${key}`;

  return { url, key };
}

/**
 * Delete recording from Cloudflare R2
 */
export async function deleteRecording(key: string): Promise<void> {
  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}

/**
 * Get recording URL (signed URL for private buckets)
 */
export async function getRecordingUrl(key: string, expiresIn = 3600): Promise<string> {
  // For public buckets, you can use the direct URL
  // For private buckets, generate a signed URL
  return `https://${process.env.R2_PUBLIC_URL}/${key}`;
}

/**
 * Get recording file (for streaming)
 */
export async function getRecordingFile(key: string): Promise<Buffer> {
  const response = await r2Client.send(
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );

  const streamToBuffer = (stream: any): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  };

  if (!response.Body) {
    throw new Error('No body in response');
  }

  return streamToBuffer(response.Body);
}

export default r2Client;

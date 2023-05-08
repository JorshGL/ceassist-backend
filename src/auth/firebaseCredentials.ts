export const credentials = {
  type: "service_account",
  projectId: "ingsoft-jbl",
  privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  clientEmail: "firebase-adminsdk-327u9@ingsoft-jbl.iam.gserviceaccount.com",
  clientId: process.env.FIREBASE_CLIENT_ID,
  authUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
  clientX509CertUrl: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-327u9%40ingsoft-jbl.iam.gserviceaccount.com",
}
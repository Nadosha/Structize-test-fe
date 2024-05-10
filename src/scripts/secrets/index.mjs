// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import fs from 'fs'
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'

const secret_name = 'prod/shally-app-fe'

const formatSecrets = (secret) => {
  const data = JSON.parse(secret);
  let result = '';

  for (const key in data) {
    result += `${key}=${data[key]}\n`;
  }

  return result;
}
const client = new SecretsManagerClient({
    region: 'us-east-1',
})

let response

try {
    response = await client.send(
        new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
        })
    )
} catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error
}

const secret = formatSecrets(response.SecretString);

// Your code goes here
fs.writeFileSync('.env', secret)
console.log(`${secret} successfully stored into .env`)


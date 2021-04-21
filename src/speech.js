import textToSpeech from '@google-cloud/text-to-speech';
import fs from 'fs';
import util from 'util';

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: 'MyFirstProject-049d965580db.json',
});

export default async function quickStart(text, nameFile) {
  const request = {
    input: { text },
    voice: { languageCode: 'ru-RU', ssmlGender: 'MALE' },
    audioConfig: { audioEncoding: 'LINEAR16' },
  };
  const [response] = await client.synthesizeSpeech(request)
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(`public/voice_acting/${nameFile}.wav`, response.audioContent, 'binary');
  console.log(`Audio content written to file: ${nameFile}.wav`);
}







import { promises as fs } from 'node:fs';
import { pdf } from 'pdf-to-img';

async function main() {
  let counter = 1;
  const document = await pdf('./assets/books/Bangla_5.pdf', { scale: 3 });
  for await (const image of document) {
    await fs.writeFile(`./assets/images/page${counter}.png`, image);
    counter++;
  }
}
main();

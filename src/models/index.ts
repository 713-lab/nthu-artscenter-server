import { Exhibition } from './Exhibition'
import { Media } from './Media'

export const startDataBase = async () => {
  try {
    await Exhibition.sync({force: true});
    await Media.sync({force: true});
  } catch(err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
}
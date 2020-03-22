import { Exhibition } from './Exhibition'
import { Media } from './Media'

export const startDataBase = async () => {
  try {
    await Exhibition.sync({alter: true});
    await Media.sync({alter: true});
  } catch(err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
}
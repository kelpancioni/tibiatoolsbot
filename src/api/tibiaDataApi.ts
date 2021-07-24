import axios, {AxiosResponse} from 'axios';
import Character from '../entity/character';

export default class TibiaDataApi {
    private static endpoint:string = 'https://api.tibiadata.com/v2/';

    static getCharData(name:string): Promise<Character>  {
        return axios.get(this.endpoint + `characters/${name}.json`).then(function (res: AxiosResponse) {
            const charData = res.data.characters.data
            if (!charData || !charData.name) {
                throw new Error("Character not found");
            }
            return new Character(
                charData.name, 
                charData.sex, 
                charData.level, 
                charData.vocation, 
                charData.guild?.name ?? '', 
                charData.guild?.rank ?? '', 
                charData.world,
                charData.residence,
                charData.status
            );
        });
    }
}
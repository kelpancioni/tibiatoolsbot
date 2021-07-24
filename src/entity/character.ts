export default class Character {
    private name:string;
    private sex:string;
    private level:number;
    private vocation:string;
    private guildName: string;
    private guildRank: string;
    private world: string;
    private residence: string;
    private status:string;


    constructor(
        name:string,
        sex:string,
        level:number,
        vocation:string,
        guildName:string,
        guildRank:string,
        world: string,
        residence: string,
        status:string
    ) {
        this.name = name;
        this.sex = sex;
        this.level = level;
        this.vocation = vocation;
        this.guildName = guildName;
        this.guildRank = guildRank;
        this.world = world;
        this.residence = residence;
        this.status = status;
    }

    getName = ():string => this.name;

    getSex = ():string => this.sex;

    getLevel = ():number => this.level;

    getVocation = ():string => this.vocation;

    getGuildName = ():string => this.guildName;

    getGuildRank = ():string => this.guildRank;

    getWorld = ():string => this.world;

    getResidence = ():string => this.residence;

    getStatus = ():string => this.status;

    getSexIcon = () => this.sex === 'male' ? '♂' : '♀';

    getStatusIcon = () => this.status === 'online' ? '🟢' : '🔴';

    getVocationIcon() {
        switch (this.vocation) {
            case 'Elder Druid' : return '❄'
            case 'Druid' : return '❄'
            case 'Royal Paladin' : return '🏹'
            case 'Paladin' : return '🏹'
            case 'Elite Knight' : return '🛡'
            case 'Knight' : return '🛡'
            case 'Sorcerer' : return '🔥'
            case 'Master Sorcerer' : return '🔥'
            default : return 'None'
        }
    }
}
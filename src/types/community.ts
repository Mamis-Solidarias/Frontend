import { editField, getItem } from "../utils/universal";
import { editCommunityId, Family } from "./family";

interface Community {
    id:             string;
    name:           string;
    address:        string;
    description:    string;
    families:       Family[];
}

let communities: Community[] = [];
let communityId: number = 0;

const createCommunity = (name: string, address: string, description: string ) : void => {
    communities.push({ id: communityId.toString(), name, address, description, families: [] });
    communityId += 1;
}

const getCommunity = (communityId: string) : Community | null => {
    return getItem(communities, communityId);
}

const editName = (id: string, name: string) : boolean => {
    return editField(communities, id, 'name', name);
}

const editAddress = (id: string, address: string) : boolean => {
    return editField(communities, id, 'address', address);
}

const editDescription = (id: string, description: string) : boolean => {
    return editField(communities, id, 'description', description);
}

const addFamily = (fam: Family, communityId: string) : boolean => {
    const communitiesList: Community[] = communities.filter( community => community.id === communityId );

    if( !! communitiesList ) {
        editCommunityId(fam.id, communityId);
        communitiesList[0].families.push(fam);
        return true;
    }

    return false;
}

const removeFamily = (fam: Family, communityId: string ) : boolean => {
    const communitiesList: Community[] = communities.filter( community => community.id === communityId );

    if( !! communitiesList ) {
        editCommunityId(fam.id, '-1');
        communitiesList[0].families = communitiesList[0].families.filter( family => family.id === fam.id);
        return true;
    }

    return false;
}


export {
    communities,
    createCommunity,
    getCommunity,
    editName,
    editAddress,
    editDescription,
    addFamily,
    removeFamily
}

export type { Community };
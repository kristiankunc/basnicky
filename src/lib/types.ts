export interface Album {
	id: string;
	name: string;
	image: string;
}

export interface Poem {
	id: string;
	name: string;
	author: string;
	text: string;
	albumId: string;
	explicit: boolean | number;
	weight: number;
}

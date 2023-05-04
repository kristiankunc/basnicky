import type { Poem } from "$lib/types";
import { Database } from "./database";

export class PoemDB extends Database {
	static async addPoem(name: string, author: string, text: string, albumId: string, explicit: number, weight: number) {
		await this.query("INSERT INTO poems (name, author, text, albumId, explicit, weight) VALUES (?, ?, ?, ?, ?, ?)", [name, author, text, albumId, explicit, weight]);
	}

	static async getPoems() {
		let res = await this.query("SELECT * FROM poems");
		res.forEach((poem: any) => {
			poem.explicit = poem.explicit == 1;
		});
		return res;
	}

	static async getPoem(poemId: string): Promise<Poem> {
		let res = (await this.query("SELECT * FROM poems WHERE id = ?", [poemId]))[0];
		res.explicit = res.explicit == 1;
		return res;
	}

	static async getPoemsAlbum(albumId: string): Promise<Poem[]> {
		let res = await this.query("SELECT * FROM poems WHERE albumId = ? ORDER BY weight ASC", [albumId]);
		res.forEach((poem: any) => {
			poem.explicit = poem.explicit == 1;
		});
		return res;
	}

	static async deletePoem(poemId: string) {
		await this.query("DELETE FROM poems WHERE id = ?", [poemId]);
	}

	static async updatePoem(poemId: string, name: string, author: string, text: string, albumId: string, explicit: number, weight: number) {
		await this.query("UPDATE poems SET name = ?, author = ?, text = ?, albumId = ?, explicit = ?, weight = ? WHERE id = ?", [
			name,
			author,
			text,
			albumId,
			explicit,
			weight,
			poemId
		]);
	}
}

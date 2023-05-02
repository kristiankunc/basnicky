import type { deletePoem } from "$lib/dashboard/delete";
import type { Poem } from "$lib/types";
import { Database } from "./database";

export class PoemDB extends Database {
	static async addPoem(name: string, author: string, text: string, albumId: string, explicit: number) {
		await this.query("INSERT INTO poems (name, author, text, albumId, explicit) VALUES (?, ?, ?, ?, ?)", [name, author, text, albumId, explicit]);
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
		let res = await this.query("SELECT * FROM poems WHERE albumId = ?", [albumId]);
		res.forEach((poem: any) => {
			poem.explicit = poem.explicit == 1;
		});
		return res;
	}

	static async deletePoem(poemId: string) {
		await this.query("DELETE FROM poems WHERE id = ?", [poemId]);
	}

	static async updatePoem(poemId: string, name: string, author: string, text: string, albumId: string, explicit: number) {
		await this.query("UPDATE poems SET name = ?, author = ?, text = ?, albumId = ?, explicit = ? WHERE id = ?", [
			name,
			author,
			text,
			albumId,
			explicit,
			poemId
		]);
	}
}

import type { AuthResult } from "./types";

export class Auth {
	static async clientCheck(password: string): Promise<AuthResult> {
		let res = await fetch("/api/auth", {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: password }
		});

		if (res.status === 200) return { success: true, message: "ok" };
		else if (res.status === 403) return { success: false, message: "špatné heslo" };
		else if (res.status === 429) return { success: false, message: "příliš mnoho pokusů" };
		else return { success: false, message: "neznámá chyba" };
	}
}

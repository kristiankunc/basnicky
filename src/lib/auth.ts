export class Auth {
    static async clientCheck(password: string): Promise<boolean> {
        let res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json",
            "Authorization": password
        },
        });

        if (res.status === 200) return true;
        else return false;
    }
}
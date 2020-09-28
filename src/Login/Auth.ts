const users = [
    {
        id: '1',
        email: 'evelin@gmail.com',
        displayName: "Evelin Szabados"
    },
    {
        id: '2',
        email: 'tamas@gmail.com',
        displayName: "Tamás Sallai"
    },
]
export async function auth(email: string | null): Promise<boolean> {
    return users.filter(user => user.email === email).length > 0;
}
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
    {
        id: '3',
        email: 'eszter@gmail.com',
        displayName: "Eszter Lévai"
    },
    {
        id: '4',
        email: 'norbert@gmail.com',
        displayName: "Norbert Aranyos"
    },
    {
        id: '5',
        email: 'adam@gmail.com',
        displayName: 'Ádám Kovács'
    },
    {
        id: '6',
        email: 'cecilia@gmail.com',
        displayName: "Cecília Tóth"
    },
]
export async function auth(email: string | null): Promise<any[]> {
    return users.filter(user => user.email === email);
}
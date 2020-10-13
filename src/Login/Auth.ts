import { Statuses } from "../Context/StatusTypes";

const users = [
    {
        id: '1',
        email: 'evelin@gmail.com',
        displayName: "Evelin Szabados",
        status: Statuses.Offline
    },
    {
        id: '2',
        email: 'tamas@gmail.com',
        displayName: "Tamás Sallai",
        status: Statuses.Offline
    },
    {
        id: '3',
        email: 'eszter@gmail.com',
        displayName: "Eszter Lévai",
        status: Statuses.Offline
    },
    {
        id: '4',
        email: 'norbert@gmail.com',
        displayName: "Norbert Aranyos",
        status: Statuses.Offline
    },
    {
        id: '5',
        email: 'adam@gmail.com',
        displayName: 'Ádám Kovács',
        status: Statuses.Offline
    },
    {
        id: '6',
        email: 'cecilia@gmail.com',
        displayName: "Cecília Tóth",
        status: Statuses.Offline
    },
]
export async function auth(email: string | null): Promise<any[]> {
    return users.filter(user => user.email === email);
}
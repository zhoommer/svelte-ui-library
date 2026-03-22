export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';
export type UserRole = 'admin' | 'editor' | 'viewer' | 'owner';

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
	department: string;
	salary: number;
	joinedAt: string;
	avatarUrl: string;
}

const firstNames = [
	'Alice',
	'Bob',
	'Carol',
	'David',
	'Emma',
	'Frank',
	'Grace',
	'Henry',
	'Isla',
	'Jack',
	'Karen',
	'Liam',
	'Mia',
	'Noah',
	'Olivia',
	'Paul',
	'Quinn',
	'Rose',
	'Sam',
	'Tara',
	'Uma',
	'Victor',
	'Wendy',
	'Xander',
	'Yara',
	'Zoe',
	'Aaron',
	'Bella',
	'Chris',
	'Dana'
];
const lastNames = [
	'Smith',
	'Johnson',
	'Williams',
	'Brown',
	'Jones',
	'Garcia',
	'Miller',
	'Davis',
	'Wilson',
	'Moore',
	'Taylor',
	'Anderson',
	'Thomas',
	'Jackson',
	'White',
	'Harris',
	'Martin',
	'Thompson',
	'Young',
	'Hernandez'
];
const departments = [
	'Engineering',
	'Design',
	'Marketing',
	'Sales',
	'Support',
	'Finance',
	'HR',
	'Legal'
];
const roles: UserRole[] = ['admin', 'editor', 'viewer', 'owner'];
const statuses: UserStatus[] = ['active', 'inactive', 'pending', 'suspended'];

function seededRandom(seed: number): () => number {
	let s = seed;
	return () => {
		s = (s * 1664525 + 1013904223) & 0xffffffff;
		return (s >>> 0) / 0xffffffff;
	};
}

export function generateUsers(count = 200): User[] {
	const rand = seededRandom(42);
	return Array.from({ length: count }, (_, i) => {
		const first = firstNames[Math.floor(rand() * firstNames.length)];
		const last = lastNames[Math.floor(rand() * lastNames.length)];
		const name = `${first} ${last}`;
		const email = `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`;
		const role = roles[Math.floor(rand() * roles.length)];
		const status = statuses[Math.floor(rand() * statuses.length)];
		const department = departments[Math.floor(rand() * departments.length)];
		const salary = Math.round((40000 + rand() * 120000) / 1000) * 1000;
		const year = 2018 + Math.floor(rand() * 7);
		const month = String(Math.floor(rand() * 12) + 1).padStart(2, '0');
		const day = String(Math.floor(rand() * 28) + 1).padStart(2, '0');
		const joinedAt = `${year}-${month}-${day}`;
		const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
		return {
			id: String(i + 1),
			name,
			email,
			role,
			status,
			department,
			salary,
			joinedAt,
			avatarUrl
		};
	});
}

export const users = generateUsers(200);

export interface NavItem {
	title: string;
	href: string;
}

export interface NavSection {
	title: string;
	items: NavItem[];
}

export const nav: NavSection[] = [
	{
		title: 'Getting Started',
		items: [
			{ title: 'Introduction', href: '/docs' },
			{ title: 'Installation', href: '/docs/installation' }
		]
	},
	{
		title: 'Buttons',
		items: [{ title: 'Button', href: '/docs/components/button' }]
	},
	{
		title: 'Typography',
		items: [{ title: 'Typography', href: '/docs/components/typography' }]
	},
	{
		title: 'Layout',
		items: [{ title: 'Layout', href: '/docs/components/layout' }]
	},
	{
		title: 'Form',
		items: [
			{ title: 'Inputs', href: '/docs/components/form' },
			{ title: 'Checkbox & Radio', href: '/docs/components/checkbox-radio' },
			{ title: 'Form Field', href: '/docs/components/form-field' }
		]
	},
	{
		title: 'Feedback',
		items: [
			{ title: 'Alert & Badge', href: '/docs/components/feedback' },
			{ title: 'Toast', href: '/docs/components/toast' }
		]
	},
	{
		title: 'Overlay',
		items: [{ title: 'Modal & Drawer', href: '/docs/components/overlay' }]
	},
	{
		title: 'Navigation',
		items: [
			{ title: 'Tabs & Breadcrumb', href: '/docs/components/navigation' },
			{ title: 'Menu', href: '/docs/components/menu' }
		]
	},
	{
		title: 'Data Display',
		items: [
			{ title: 'Avatar', href: '/docs/components/avatar' },
			{ title: 'Accordion', href: '/docs/components/accordion' },
			{ title: 'Table', href: '/docs/components/table' }
		]
	}
];

import React from 'react'

import Link from "next/link"


import './NavBar.css'

export default function FakeNav() {
	return (
		<div className='fake'>
			<Link className="btn btn__transparent" href='/customer'>Customer</Link>
			<Link className="btn btn__transparent" href='/dashboard/login'>Login</Link>
			<Link className="btn btn__transparent" href='/dashboard/rol/admin'>Admin</Link>
			<Link className="btn btn__transparent" href='/dashboard/rol/waiter'>Waiter</Link>
		</div>
	)
}

import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { userLogout } from '../../api/userApi';

export default function LogOut({ setIsLogin }) {

    const navigate = useNavigate();

    const submit = async () => {

        try {
            const response = await userLogout();

            console.log(response?.data)

            if (response.data.message === "Logout successfully") {

                setIsLogin(false);
                navigate("/",)
            }

        } catch (error) {
            console.log(error.response?.data)
        }
    }
    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
            <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-lg shadow-slate-200/60 sm:p-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <FaSignOutAlt className="text-2xl" aria-hidden="true" />
                </div>

                <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-800">
                    Log out of FarmerK?
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    You can sign in again whenever you want.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <Link
                        to="/profile"
                        className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                    >
                        Cancel
                    </Link>
                    <button
                        type="button"
                        onClick={submit}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        <FaSignOutAlt aria-hidden="true" />
                        Logout
                    </button>
                </div>
            </section>
        </main>
    )
}

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const checkAuth = (Component) => {
    function Wrapper(props) {
        const user = useSelector(store => store.auth.user);
        const loading = useSelector(store => store.auth.loading);
        console.log("auth",loading,"u",user)
        const navigate = useNavigate();

        useEffect(() => {
            if (!loading && !user) {
                navigate('/');
            }
        }, [user, loading, navigate]);

        if (loading) {
            return <div>Loading...</div>;
        }

        return <Component {...props} />;
    }
    return Wrapper;
};

export default checkAuth;

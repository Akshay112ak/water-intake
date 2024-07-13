import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserFromLocalStorage } from "./Authslice";

function AutoLogin(props) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    useEffect(() => {
        dispatch(setUserFromLocalStorage());
        console.log("AutoLogin executed");
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return props.children;
}

export default AutoLogin;

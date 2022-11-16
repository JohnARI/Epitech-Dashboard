import React, {useState, useEffect} from "react";
import {Header, SideNav} from "./navigation";
import axios from "axios";




export function Settings(){

    const token = localStorage.getItem("user-info");
    const [page, setPage] = useState("My settings");
    const [userInfo, setUserInfo] = useState(localStorage.getItem("user-info") || undefined);
    const [myWidgets, setMyWidgets] = useState<string>();


    useEffect(() => {
        // @ts-ignore
        setMyWidgets( localStorage.getItem("user-widget") || undefined);
    }, [myWidgets])
    return(
        <>
            <SideNav />
            <section className="content setWidget">
                <Header page={page}/>
                {myWidgets}
                <form>
                    <article className="shadow0 widget1">
                        <h1>Add widgets</h1>
                        <button onClick={async () => {
                            await axios.post("api/widget/user/spotify-search",{data: "bjr"}, {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>spotify-search</button>
                        <button onClick={async () => {
                            await axios.post("api/widget/user/spotify-favorite",{data: "bjr"}, {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>spotify-favorite</button>
                        <button onClick={async () => {
                            await axios.post("api/widget/user/spotify-play",{data: "bjr"}, {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>spotify-play</button>
                        <button onClick={async () => {
                            await axios.post("api/widget/user/weather",{data: "bjr"}, {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>weather</button>
                        <button onClick={async () => {
                            await axios.post("api/widget/user/twitter-user",{data: "bjr"}, {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>twitter-user</button>
                        <button onClick={async () => {
                            await axios.post("api/widget/user/twitter-post",{data: "bjr"}, {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>twitter-post</button>
                        <button onClick={async () => {
                            await axios.post("api/widget/user/twitter-search",{data: "bjr"}, {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>twitter-search</button>
                    </article>
                    <article className="shadow0 widget1">
                        <h1>Remove widgets</h1>
                        <button onClick={async () => {
                            await axios.delete("api/widget/spotify-search/delete", {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>spotify-search</button>
                        <button onClick={async () => {
                            await axios.delete("api/widget/spotify-favorite/delete",{
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>spotify-favorite</button>
                        <button onClick={async () => {
                            await axios.delete("api/widget/spotify-play/delete", {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>spotify-play</button>
                        <button onClick={async () => {
                            await axios.delete("api/widget/weather/delete", {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>weather</button>
                        <button onClick={async () => {
                            await axios.delete("api/widget/twitter-user/delete", {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>twitter-user</button>
                        <button onClick={async () => {
                            await axios.delete("api/widget/twitter-post/delete", {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>twitter-post</button>
                        <button onClick={async () => {
                            await axios.delete("api/widget/twitter-search/delete", {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            });
                        }}>twitter-search</button>
                    </article>
                </form>


                <button onClick={async () => {
                    fetch("/api/user/user-widgets", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userInfo}`,
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        }
                    })
                        .then((res) => res.json())
                        .then((result) => {
                                localStorage.setItem("user-widget", result);
                                setMyWidgets( localStorage.getItem("user-widget") || undefined);
                            }
                        )
                }}>Update</button>
            </section>
        </>
    )
}
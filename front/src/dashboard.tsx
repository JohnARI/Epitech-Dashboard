// ============================================= Imports =============================================
// ------------------------------------- General -------------------------------------
import React, {useEffect, useState} from 'react';
import {Header, SideNav} from './navigation';
import './dashboard.css';

import {SpotifyPlayerWidget} from "./widgets/SpotifyPlayerWidget";
import {SearchBarSpotify} from "./widgets/SearchBarSpotify";
import {SpotifyWaitingList} from "./widgets/SpotifyWaitingList";
import {WeatherWidget} from "./widgets/weather";
import axios from "axios";
import {PostTweet, GetTweetByHashtag, GetTwitterUser} from './widgets/twitter';
// import {SpotifyWidget} from "./widgets/spotify";



// ------------------------------------- Widgets -------------------------------------


// ------------------------------------- Widgets -------------------------------------
// import {} from './widgets/weather';

// ============================================= Components =============================================
// ------------------------------------- Widget building -------------------------------------
interface widgetType {
    widgetType:string,
    Widget:React.ReactNode,
}
const WidgetTest = ({widgetType, Widget}:widgetType) => {
    return(
        <article className={`shadow0 ${widgetType}`}>
            {Widget}
        </article>
    )
}


interface Track {
    albumUrl: string,
    artist: string,
    title :string,
    uri : string
}

// ------------------------------------- Composition -------------------------------------
    export function ComposeDashboard() {

        const [page, setPage] = useState("Dashboard");

        const [playingTrack, setPlayingTrack] = useState<string>("")
        const [waitingList, setWaitingList] = useState<Array<Track>>([]);
        const [autoPlayTrack, setAutoPlayTrack] = useState("")
        const [userInfo, setUserInfo] = useState(localStorage.getItem("user-info") || undefined)
        const [tokenSpotify, setTokenSpotify] = useState(localStorage.getItem("tokenSpotify") || undefined)

        const [updateWidget,setUpdateWidget] = useState<boolean>(false);

        useEffect(() => {
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
                    setUpdateWidget(true);
                }
            )
            .catch((err) => console.log(err));
    }, [userInfo]);

        const playNow = (track: Track) => {
            setPlayingTrack(track.uri)
        }

        const addToWaitingList = async (track: Track) => {

            if (waitingList.includes(track)) return
            await setWaitingList([...waitingList, track])
            axios.post("http://localhost:8080/api/spotify/setfavoritlist", [...waitingList, track], {
                headers: {
                    authorization: `Bearer ${userInfo}`
                }
            })
        }

        const autoPlay = (track: Track) => {
            setAutoPlayTrack(track.uri)
            axios.post("http://localhost:8080/api/spotify/setautoplay", {track: track.uri}, {
                headers: {
                    authorization: `Bearer ${userInfo}`
                }
            })
        }
        const getAutoPlay = async () => {
            const res = await axios.get("http://localhost:8080/api/spotify/getautoplay", {
                headers: {
                    authorization: `Bearer ${userInfo}`
                }
            })
            setAutoPlayTrack(res.data)
        }

        useEffect(() => {
            getAutoPlay();
            (async () => {
                const res = await axios.get("http://localhost:8080/api/spotify/getfavoritlist", {
                    headers: {
                        authorization: `Bearer ${userInfo}`
                    }
                })
                await setWaitingList(res.data)
            })()
        }, [])
        return (
            <>
                <SideNav/>
                <section className="content">
                    <Header page={page}/>
                    <article>
                        {localStorage.getItem("user-widget")?.includes("spotify-search") && <WidgetTest widgetType="widget1" Widget={<SearchBarSpotify autoPlay={autoPlay} playNow={playNow} addToWaitingList={addToWaitingList}/>}/> }
                        {localStorage.getItem("user-widget")?.includes("spotify-play") && <WidgetTest widgetType="widget1" Widget={SpotifyPlayerWidget(playingTrack, autoPlayTrack)}/> }
                        {localStorage.getItem("user-widget")?.includes("spotify-favorite") && <WidgetTest widgetType="widget1" Widget={SpotifyWaitingList(waitingList, playNow)}/> }
                        {localStorage.getItem("user-widget")?.includes("weather") && <WidgetTest widgetType="widget2" Widget={<WeatherWidget/>}/> }
                        {localStorage.getItem("user-widget")?.includes("twitter-post") && <WidgetTest widgetType="widget1" Widget={<PostTweet/>}/> }
                        {localStorage.getItem("user-widget")?.includes("twitter-search") && <WidgetTest widgetType="widget1" Widget={<GetTweetByHashtag/>}/> }
                        {localStorage.getItem("user-widget")?.includes("twitter-user") && <WidgetTest widgetType="widget1" Widget={<GetTwitterUser/>}/> }
                    </article>
                </section>
            </>
        )
    }

import {SpotifyPlayerWidget} from "./widgets/SpotifyPlayerWidget";
import React, {useState} from "react";
import {Header, SideNav} from "./navigation";
import {SpotifyLogin} from "./assets/components/SpotifyLogin";

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

const TwitterLogin = () => {
    return(
        <a href="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=T3ZMY1lIQkw2b2FmWmlIdmdfN1M6MTpjaQ&redirect_uri=http://localhost:3000/twitterLogin&scope=tweet.read tweet.write users.read offline.access&state=state&code_challenge=challenge&code_challenge_method=plain">Login with Twitter</a>
    )
}

export function Services(){
    const [page, setPage] = useState("My services");
    return(
        <>
            <SideNav />
            <section className="content">
                <Header page={page}/>
                <WidgetTest widgetType="widget1" Widget = {<SpotifyLogin/>}/>
                <WidgetTest widgetType="widget1" Widget = {<TwitterLogin/>}/>
            </section>
        </>
    )
}
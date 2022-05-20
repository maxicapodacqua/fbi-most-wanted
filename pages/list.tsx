import {NextPage} from "next";
import useSWR from 'swr';
import fetcher from "../src/fetcher";
import {LinearProgress} from "@mui/material";

interface Wanted {
    aliases?: string[];
}
interface WantedListResponse {
    total: number;
    items: Wanted[];
    page: number;
}

const List :NextPage = () => {

    const { data, isValidating, error } = useSWR<WantedListResponse>(process.env.NEXT_PUBLIC_API_FBI_URL + 'wanted/v1/list', fetcher);
    // console.log(data?.items.length);
    return (
        <>
            {isValidating ? <LinearProgress/> : null}
            <h1>List of most wanted from FBI</h1>
            {data ?
            <div>
                <h2>Showing Page {data.page}</h2>
                <ul>
                    {data.items.map((item: Wanted, index: number) => {
                        return <li key={index}>{item.aliases?.join(', ') ?? 'No Name'}</li>
                        }
                    )}
                </ul>
            </div>
             : null}
        </>
    );
};

export default List;

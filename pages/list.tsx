import {NextPage} from "next";
import useSWR from 'swr';
import fetcher from "../lib/fetcher";

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
    console.log(data?.items.length);
    return (
        <>
            <h1>List of most wanted from FBI</h1>
            {isValidating ? <span>Loading...</span> : null}
            {data ?
            <div>
                <h2>Showing Page {data.page}</h2>
                <ul>
                    {data.items.map((item: Wanted) => {
                        return <li>{item.aliases?.join(', ') ?? 'No Name'}</li>
                        // if (item.aliases) {
                        //
                        //     console.log(item)
                        // }
                            // (<li>{item.aliases.join(' ')}</li>)
                        }
                    )}
                </ul>
            </div>
             : null}
        </>
    );
};

export default List;

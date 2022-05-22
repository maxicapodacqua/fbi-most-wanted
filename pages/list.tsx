import {NextPage} from "next";
import useSWR from 'swr';
import fetcher from "../src/fetcher";
import {Alert, Card, CardMedia, LinearProgress} from "@mui/material";

interface WantedImage {
    original: string;
    thumb: string;
    large: string;
    caption: string|null;
}
interface Wanted {
    aliases?: string[];
    images?: WantedImage[];
}

interface WantedListResponse {
    total: number;
    items: Wanted[];
    page: number;
}

const List: NextPage = () => {

    const {
        data,
        isValidating,
        error
    } = useSWR<WantedListResponse>(process.env.NEXT_PUBLIC_API_FBI_URL + 'wanted/v1/list', fetcher);
    // console.log(data?.items.length);
    return (
        <>
            {isValidating ? <LinearProgress/> : null}
            <h1>List of most wanted from FBI</h1>
            {error ? <Alert severity={'error'}>Something went wrong getting information from the FBI</Alert> : null}
            {data ?
                <div>
                    <h2>Showing Page {data.page}</h2>
                    {data.items.map((item: Wanted, index: number) => {
                        return <Card>
                            {item.images ?
                                <CardMedia
                                    key={index}
                                    component='img'
                                    height='140'
                                    image={item.images[0]!.thumb}
                                    alt={item.images[0]!.caption ?? ''}
                                /> : null}
                        </Card>
                    })}

                </div>
                : null}
        </>
    );
};

export default List;

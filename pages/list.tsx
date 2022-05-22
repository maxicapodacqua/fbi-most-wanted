import {NextPage} from "next";
import useSWR from 'swr';
import fetcher from "../src/fetcher";
import {Alert, Card, CardMedia, ImageList, ImageListItem, ImageListItemBar, LinearProgress, Link} from "@mui/material";
import Image from "next/image";
// import Link from "next/link";

interface WantedImage {
    original: string;
    thumb: string;
    large: string;
    caption: string|null;
}
interface Wanted {
    aliases?: string[];
    images?: WantedImage[];
    url: string;
    title: string;
    description: string;
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
                    <ImageList cols={5} gap={8}>
                    {data.items.map((item: Wanted, index: number) => {
                        return <Link href={item.url}>
                            <ImageListItem key={index}>
                                {item.images?.length ?
                                <Image src={item.images[0].large} width={100} height={200} />
                                    : null}
                                <ImageListItemBar
                                    title={item.title}
                                    subtitle={item.description}
                                    />
                            </ImageListItem>
                        </Link>
                        // return <Card key={index} sx={{maxWidth: 345}}>
                        //     {item.images ?
                        //         <CardMedia
                        //             component='img'
                        //             height='140'
                        //             image={item.images[0]!.thumb}
                        //             alt={item.images[0]!.caption ?? ''}
                        //         /> : null}
                        // </Card>
                    })}
                    </ImageList>

                </div>
                : null}
        </>
    );
};

export default List;

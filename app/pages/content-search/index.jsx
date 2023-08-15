import React from "react"
import fetch from "cross-fetch"
import {
    List,
    ListItem,
    Box,
    Flex,
    Text
} from '@salesforce/retail-react-app/app/components/shared/ui'
import Link from '@salesforce/retail-react-app/app/components/link'

const SITE_ID = 'RefArch'
const CLIENT_ID = '2470973a-b8b6-4e91-b9c7-338f2d20c1db'

const ContentSearch = ({contentResult}) => {
    if (!contentResult) {
        return <Text textAlign="center">Loading...</Text>
    }

    const {hits = []} = contentResult

    return (
        <Box
            layerStyle="page"
            className="page-content-search"
            height={'100%'}
            padding={{lg: 4, md: 2, sm: 0, base: 0}}
        >
            <Flex
                h="100%"
                justify="center"
                align="center"
                flexDirection="column"
                px={{base: 5, md: 12}}
                py={{base: 24, md: 30}}
            >
                <Box mb={12}>
                    {hits.length ? (
                        <List>
                            {hits.map(({id, name}) => {
                                return (
                                    <Link key={id} to={`/content/${id}`}>
                                        <ListItem>{name}</ListItem>
                                    </Link>
                                )
                            })}
                        </List>
                    ) : (
                        <Text textAlign="center">No Contents Found.</Text>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}

ContentSearch.getProps = async () => {
    let contentResult
    const res = await fetch(`http://localhost:3000/mobify/proxy/ocapi/s/${SITE_ID}/dw/shop/v20_2/content_search?q=about&client_id=${CLIENT_ID}`)

    if(res.ok) {
        contentResult = await res.json()
    }
    if(process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }
    return {contentResult}
}

ContentSearch.getTemplateName = () => 'content-search'

export default ContentSearch
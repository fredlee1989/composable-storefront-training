import React from "react"
import fetch from "cross-fetch"
import {
    Alert,
    AlertIcon,
    Box,
    Flex,
    Text
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {getAppOrigin} from '@salesforce/pwa-kit-react-sdk/utils/url'

import {useQuery} from "@tanstack/react-query"
import {useParams} from "react-router-dom"
// import {HTTPError} from "@salesforce/pwa-kit-react-sdk/ssr/universal/errors"

const SITE_ID = 'RefArch'
const CLIENT_ID = '2470973a-b8b6-4e91-b9c7-338f2d20c1db'

const ContentDetails = () => {
    const params = useParams()
    const {data, error, isLoading} = useQuery([params.id], () => {
            return fetch(`${getAppOrigin()}/mobify/proxy/ocapi/s/${SITE_ID}/dw/shop/v20_2/content/${params.id}?client_id=${CLIENT_ID}`).then(res => res.json()).then((json) => {
                console.log(json)
                return json
            })
        }
    )

    if(isLoading) {
        return <Text textAlign="center">Loading...</Text>
    } else if (error) {
        return (
            <Alert padding="10" status="error">
                <AlertIcon/>
                Error query hit: {error}
            </Alert>
        )
    } else if (data.fault) {
        return (
            <Alert padding="10" status="error">
                <AlertIcon/>
                {data.fault.message}
            </Alert>
        )
    } else {
        return (
            <Box
                layerStyle="page"
                className="page-content-details"
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
                        <div dangerouslySetInnerHTML={{__html: data.c_body}} />
                    </Box>
                </Flex>
            </Box>
        )
    }
}

ContentDetails.setTemplateName = () => "content-details"

export default ContentDetails
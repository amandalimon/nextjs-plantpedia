import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { QueryStatus } from '@api/index'

import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Grid } from '@ui/Grid'
import { RichText } from '@components/RichText'
import { AuthorCard } from '@components/AuthorCard'
import { getPlant } from '@api/index'

export default function PlantEntryPage() {
    const [status, setStatus] = useState<QueryStatus>('idle')
    const [plant, setPlant] = useState<Plant | null>(null)

    const router = useRouter()
    const slug = router.query.slug

    useEffect(() => {
        if (typeof slug !== 'string') {
            return
        }
        getPlant(slug)
            .then((receivedData) => {
                setPlant(receivedData)
                setStatus('success')
            })
            .catch(() => {
                setStatus('error')
            })
    }, [slug])

    if (status === 'loading' || status === 'idle') {
        return (
            <Layout>
                <main>
                    Loading awesomeness..
                </main>
            </Layout>
        )
    }

    if (plant === null || status === 'error') {
        return (
            <Layout>
                <main>Error 404</main>
            </Layout>
        )
    }

    return (
        <Layout>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8} lg={9} component="article">
                    <figure>
                        <img width={952} src={plant.image.url} alt={plant.image.title} />
                    </figure>
                    <div className="px-12 pt-8">
                        <Typography variant="h2">{plant.plantName}</Typography>
                    </div>
                    <div className="p-10">
                        <RichText richText={plant.description} />
                    </div>
                </Grid>
                <Grid item xs={12} md={4} lg={3} component="aside">
                    <section>
                        <Typography variant="h5" component="h3" className="mb-4">
                            Recent Posts
                        </Typography>
                    </section>
                    <section className="mt-10">
                        <Typography variant="h5" component="h3" className="mb-4">
                            Categories
                        </Typography>
                    </section>
                </Grid>
            </Grid>
            <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
                <AuthorCard {...plant.author} />
            </section>
        </Layout>
    )
}
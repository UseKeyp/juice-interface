import { t, Trans } from '@lingui/macro'
import Grid from 'components/Grid'
import Loading from 'components/Loading'
import ProjectCard, { ProjectCardProject } from 'components/ProjectCard'
import { useLoadMoreContent } from 'hooks/LoadMore'
import { useInfiniteProjectsQuery, useProjectsSearch } from 'hooks/Projects'
import { PV } from 'models/pv'
import { useEffect, useRef } from 'react'
import { classNames } from 'utils/classNames'

export default function AllProjects({
  pv,
  searchText,
  orderBy,
  showArchived,
}: {
  pv: PV[] | undefined
  searchText: string
  orderBy: 'createdAt' | 'totalPaid'
  showArchived: boolean
}) {
  const loadMoreContainerRef = useRef<HTMLDivElement>(null)
  const pageSize = 20

  const {
    data: pages,
    isLoading: isLoadingProjects,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteProjectsQuery({
    orderBy,
    pageSize,
    orderDirection: 'desc',
    state: showArchived ? 'archived' : 'active',
    pv,
  })

  const { data: searchPages, isLoading: isLoadingSearch } =
    useProjectsSearch(searchText)

  const [scrolledToBottom] = useLoadMoreContent({
    loadMoreContainerRef,
    hasNextPage,
  })

  const isLoading = isLoadingProjects || isLoadingSearch

  const concatenatedPages = searchText?.length
    ? searchPages
    : pages?.pages?.reduce((prev, group) => [...prev, ...group], [])

  useEffect(() => {
    if (scrolledToBottom) {
      fetchNextPage()
    }
  }, [fetchNextPage, scrolledToBottom])

  return (
    <>
      {concatenatedPages && (
        <Grid>
          {concatenatedPages.map(p => (
            <ProjectCard
              key={`${p.id}_${p.pv}`}
              project={p as ProjectCardProject}
            />
          ))}
        </Grid>
      )}

      {(isLoading || isFetchingNextPage) && <Loading />}

      {/* Place a div below the grid that we can connect to an intersection observer */}
      <div ref={loadMoreContainerRef} />

      {hasNextPage &&
      !isFetchingNextPage &&
      (concatenatedPages?.length || 0) > pageSize ? (
        <div
          className="cursor-pointer p-5 text-center text-grey-500 dark:text-grey-300"
          role="button"
          onClick={() => fetchNextPage()}
        >
          <Trans>Load more</Trans>
        </div>
      ) : (
        !isLoadingSearch &&
        !isLoadingProjects && (
          <div
            className={classNames(
              'px-5 pb-5 text-center text-grey-400 dark:text-slate-200',
              concatenatedPages?.length !== 0 ? 'pt-5' : '',
            )}
          >
            {concatenatedPages?.length}{' '}
            {concatenatedPages?.length === 1 ? t`project` : t`projects`}{' '}
            {searchText ? t`matching "${searchText}"` : ''}
          </div>
        )
      )}
    </>
  )
}

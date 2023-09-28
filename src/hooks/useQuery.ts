import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'

import { useQueryParams } from './useQueryParams'
export const useQueryString = () => {
  const query = useQueryParams()
  const queryString = omitBy(
    {
      _limit: query?._limit ?? '6',
      _page: query?._page ?? '1',
      _sort: query?._sort,
      _order: query?._order
    },
    isUndefined
  )
  return queryString
}

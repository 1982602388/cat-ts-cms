import pageContent from '@/components/page-content'
import { ref } from 'vue'
export function usePageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const resetBtnClick = () => {
    pageContentRef.value?.getPageData()
  }
  const queryBtnClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, resetBtnClick, queryBtnClick]
}

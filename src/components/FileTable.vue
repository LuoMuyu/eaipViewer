<script setup>
	import {ref, watch} from "vue"
	import { useRoute, useRouter } from "vue-router";
	import { useContentStore } from "@/store/index.js";
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n()

	const route = useRoute()

	const router = useRouter()

	const data = ref([])

	const columns = ref([])

	const rowKey = ref('')

	const loading = ref(false)

	const contentStore = useContentStore()

	const active = ref(null)

	const selectChange = (key, opts) => {
		console.log('selectChange', key ,opts)
		checkAndSetContent(opts.currentRowData, opts.currentRowKey)
	}

	const checkAndSetContent = (node, key) => {
		if (node) {
			// console.log("node: ",node)
			let contentPath, contentEnPath, type;
			contentPath = node.Document
			contentEnPath = node.Document
			type = 'pdf'
			contentStore.setContent(contentPath, contentEnPath, type)
			router.push({ name: route.name, params: {id: key} })
		}
	}

	const config = {
		NOTAM: {
			url: '../Data/JsonPath/NOTAM.JSON',
			varName: 'notamTreeData',
			rowKey: 'SeriesName',
			columns: [
				{
					colKey: 'SeriesName',
					title: t('NOTAM.title.name'),
				},
				{
					colKey: 'GenerateTime',
					title: t('NOTAM.title.generateTime')
				}
			]
		},
		AICs: {
			url: '../Data/JsonPath/AIC.JSON',
			varName: 'aicTreeData',
			rowKey: 'Id',
			columns: [
				{
					colKey: 'Serial',
					title: t('AICs.title.serial'),
					width: '56px',
				},
				{
					colKey: 'Pub_Date',
					title: t('AICs.title.pubDate')
				},
				{
					colKey: t('AICs.title.local_subject'),
					title: t('AICs.title.subject')
				}
			]
		},
		SUPs: {
			url: '../Data/JsonPath/SUP.JSON',
			varName: 'supTreeData',
			rowKey: 'Id',
			columns: [
				{
					colKey: 'Serial',
					title: t('SUPs.title.serial'),
					width: '56px',
				},
				{
					colKey: t('SUPs.title.local_subject'),
					title: t('SUPs.title.subject')
				},
				{
					colKey: 'period',
					title: t('SUPs.title.period')
				},
			]
		}
	}

	const loadData = async (url, varName) => {
		loading.value = true;
		const resp = await fetch(url)
		if (resp.status === 200) {
			data.value = await resp.json();
			loading.value = false;
		}
	}

	watch([() => route.name, () => route.params.id],async  (newVal, oldVal) => {
		const conf = config[newVal[0]]
		if (newVal[0] !== oldVal[0]) {
			if (conf) {
				await loadData(conf.url, conf.varName);
				rowKey.value = conf.rowKey;
				columns.value = conf.columns;
			}
		}
		if (newVal[1]) {
			active.value = [newVal[1]];
			// get active node from data
			let node;
			data.value.forEach((item) => {
				if (item[conf.rowKey].toString() === newVal[1]) {
					node = item;
				}
			})
			checkAndSetContent(node, newVal[1])
		}
	}, {immediate: true})
</script>

<template>
  <t-table
    :active-row-keys="active"
    class="table"
    :row-key="rowKey"
    :data="data"
    :foot-data="[{}]"
    :columns="columns"
    :max-height="'calc(100vh - 57px)'"
    :select-on-row-click="true"
    :active-row-type="'single'"
    :border="false"
    row-selection-type="single"
    @select-change="selectChange"
  >
    <template #period="{ row }">
      <p>from {{ row.Effective_Time }}(UTC)</p>
      <p v-if="row.Out_Date">
        to {{ row.Out_Date }}(UTC)
      </p>
    </template>
  </t-table>
</template>

<style scoped>
	.table {
		min-height: calc(100vh - 132px);
	}

	:deep(.t-table-demo__select-without-handler) {
		.t-table .t-table__row--selected {
			> td {
				color: var(--td-brand-color);
				font-weight: bold;
			}
		}
	}
</style>

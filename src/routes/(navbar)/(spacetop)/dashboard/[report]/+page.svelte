<script lang="ts">
	import { userPrivateData } from '$lib/firebase/firebase';
	import { page } from '$app/stores';

	const isTitleInArray = (title: string, array: any[]) => array.some((obj) => obj.title === title);
</script>

{#if isTitleInArray($page.params.report, $userPrivateData?.reports ?? [])}
	{#each $userPrivateData?.reports ?? [] as report}
		{#if report.title === $page.params.report}
			<!-- {JSON.stringify(report)} -->

			<div class="flex h-[92vh] items-center justify-center">
				<div class="div-4 bg-gree-50 m-2 flex h-[90%] w-full flex-col items-center rounded-md border-2 border-green-700 drop-shadow-lg">
					<h1 class="text-2xl font-semibold underline">Report</h1>

					<div class="h-4"></div>

					<div class="flex w-full flex-col text-xl font-medium">
						<div class="flex gap-2">
							<div>Title :</div>
							<div>{report.title}</div>
						</div>
						<div class="flex gap-2">
							<div>Category :</div>
							<div>{report.category}</div>
						</div>
						<div class="flex gap-2">
							<div>Date Uploaded :</div>
							<div>{report.uploadTime}</div>
						</div>
						<div class="flex gap-2">
							<div>Uploaded Image :</div>
							<img src={report.photoURL} alt="uploaded" />
						</div>
						<div class="flex gap-2">
							<div>AI Diagnosis :</div>
							<div>{report.aiDiagnosis}</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{/each}
{/if}

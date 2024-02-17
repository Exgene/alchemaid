<script lang="ts">
	import { userPrivateData } from '$lib/firebase/firebase';
	import { page } from '$app/stores';
  
	const isTitleInArray = (title: string, array: any[]) => array.some((obj) => obj.title === title);
  </script>
  
  {#if isTitleInArray($page.params.report, $userPrivateData?.reports ?? [])}
	{#each $userPrivateData?.reports ?? [] as report}
	  {#if report.title === $page.params.report}
	  <div class="w-full h-[89dvh] p-6 flex items-center justify-center">
		<div class="flex flex-col h-2/3 w-[90%] lg:w-fit lg:h-fit ms-center justify-center items-center bg-green-50 p-4 rounded-lg border border-green-700 shadow-md">
			<h1 class="text-2xl font-bold mb-4">Report</h1>
  
			<div class="flex flex-col gap-4">
			  <div class="flex-grow font-medium">Title: {report.title}</div>
  
			  <div class="flex-grow font-medium">Category: {report.category}</div>
  
			  <div class="flex-grow font-medium">Date Uploaded: {report.uploadTime.toDate().toDateString()}</div>
  
			  <div class="flex-grow font-medium">Uploaded Image: 
				{#if !report.image}
				No Image Uploded
				{:else}
				<img src={report.image} alt="Uploaded Image" class="w-48 h-48 rounded-md" />
				{/if}
			  </div>
  
			  <div class="flex-grow font-medium">AI Diagnosis:</div>
			  <div>{report.aiDiagnosis}</div>
			</div>
		  </div>
		</div>
	  {/if}
	{/each}
  {/if}
  
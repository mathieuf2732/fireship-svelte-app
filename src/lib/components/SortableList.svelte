<script lang="ts">
	import type { LinkListItem } from "$lib/Models/LinkItem";
	import type { Snippet } from "svelte";
	import { flip } from "svelte/animate";

	interface Props {
		list: any[];
		sort: (list: LinkListItem[]) => void;
		snipped: Snippet<[LinkListItem, number]>;
	}

	let { list, sort, snipped }: Props = $props();
	let isOver = $state<boolean | string>(false);

	function getDraggedParent(node: any): LinkListItem {
		if (!node.dataset.index) {
			return getDraggedParent(node.parentNode);
		} else {
			return { ...node.dataset } as LinkListItem;
		}
	}

	function onDragStart(e: DragEvent) {
		const dragged = getDraggedParent(e.target);
		e.dataTransfer?.setData("source", dragged?.index.toString());
	}

	function onDragOver(e: DragEvent) {
		e.preventDefault();
		const id = (e.target as HTMLElement)?.dataset?.id;
		const dragged = getDraggedParent(e.target);
		isOver = dragged?.id ?? false;
	}

	function onDragLeave(e: DragEvent) {
		const dragged = getDraggedParent(e.target);
		isOver === dragged.id && (isOver = false);
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		isOver = false;
		const dragged = getDraggedParent(e.target);
		reorder(e.dataTransfer?.getData("source"), dragged.index);
	}

	function reorder(from: any, to: any) {
		const newList = [...list];
		newList[from] = [newList[to], (newList[to] = newList[from])][0];
		sort(newList);
	}
</script>

{#if list?.length}
	<ul class="list-none p-0 flex flex-col items-center">
		{#each list as item, index (item.id)}
			<li
				class="border-2 border-dashed border-transparent p-2 transition-all max-w-md w-full"
				class:over={item.id === isOver}
				data-index={index}
				data-id={item.id}
				draggable="true"
				ondragstart={onDragStart}
				ondragover={onDragOver}
				ondragleave={onDragLeave}
				ondrop={onDrop}
				animate:flip={{ duration: 300 }}
			>
				{@render snipped(item, index)}
			</li>
		{/each}
	</ul>
{:else}
	<p class="text-center my-12 text-lg font-bold">No items</p>
{/if}

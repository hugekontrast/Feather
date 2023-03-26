import { CheckIcon, HeartIcon } from '@heroicons/react/24/solid'
import { Circle } from "@phosphor-icons/react";
import { useState, useEffect } from 'react'
import { cn } from '../util/cn'
import { setItem } from '../util/useStorage'
import Pill from '../components/Pill'


export default function Task(props){

	const [ finished, setFinished ] = useState(props.completedTasks.includes(props.id) && props.menuOption === 0)
	const [ selected, setSelected ] = useState(() => {
		let s = new Set(props.selectedList)
		return s.has(props.id)
	})

	function setComplete(id){
		let s = new Set(props.completedTasks)
		s.add(id)
		props.setCompletedTasks([ ...s])
	}

	function setUncomplete(id){
		let s = new Set(props.completedTasks)
		if(s.has(id)){
			s.delete(id)
		}
		props.setCompletedTasks([ ...s])
	}

	useEffect(() => {
		let s = new Set(props.selectedList)
		setSelected(s.has(props.id))
	}, [props.selectedList])

	return (
		<li className={cn("relative flex items-center gap-2 w-full justify-between p-3 border-2 rounded-lg my-4", selected ? "border-black dark:border-white" : "dark:border-gray-800")}>
			{
				props.menuOption === 0 &&
				<div 
					className={cn("w-7 min-w-7 min-h-7 h-7 aspect-square rounded border-2 border-black dark:border-white mx-3 cursor-pointer flex items-center", finished ? "bg-black text-white dark:bg-white dark:text-black" : "")}
					onClick={(e) => {
						let n = !finished;
						setFinished(n)
						if(n){
							setComplete(props.id)
						} else {
							setUncomplete(props.id)
						}
					}}
				>
					{
						finished && <CheckIcon className="m-auto stroke-1 stroke-white dark:stroke-black" />
					}
				</div>
			}
			<div className="w-full flex flex-col gap-2">
				<h1 className={cn("text-lg", props.menuOption === 0 && finished ? 'line-through text-gray-500' : 'no-underline')}>
					{props.title.split(' ').map((i, ind) => {
						if(i.startsWith('@')){
							return <p key={ind + '@'} className={cn("rounded px-[0.25em] inline-block font-medium mr-1", finished && props.menuOption === 0 ? "line-through font-normal" : "bg-lime-200 dark:text-gray-900")}>{i.substring(1)}</p>
						}
						return i + ' '
					})}
				</h1>
				<ul className="flex flex-wrap items-center gap-2">
					{
						props.tags.map((i, ind) => <Pill key={ind+'a'} text={i} />)
					}
					{
						props.menuOption === 1 && ( props.days.length < 7 ? props.days.map((i, ind) => <Pill key={ind+'b'} text={i} />) :  <Pill key={'c'} text="week" />)
					}
				</ul>
			</div>
			<button 
				className={cn('ml-auto',selected ? "p-1" : "p-2")}
				onClick={(e) => {
					setSelected(!selected)
					let s = new Set(props.selectedList);
					if(s.has(props.id)){
						s.delete(props.id);
					} else {
						s.add(props.id)
					}
					props.setSelectedList([...s])
				}}
			>
				<Circle 
					weight="fill"
					size={32} 
					className={cn(selected ? "w-6 h-6" : "w-3 h-3")} 
				/>
			</button>
			{
				props.liked && <div className={cn("p-2 rounded-full absolute -top-2 -left-2 bg-white dark:bg-gray-900 border-2 dark:border-gray-800", selected ? "border-black dark:border-white" : "dark:border-gray-800")}>
					<HeartIcon />
				</div>
			}
		</li>
	)
}
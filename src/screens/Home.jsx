import Header from '../components/Header'
import Task from '../components/Task'
import { PlusSmallIcon, TrashIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { SparklesIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'

export default function Home(props){

	const daysName = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
	const today = daysName[new Date().getDay()]
	const [ menuOption, setMenuOption ] = useState(0)
	const [ ftasks, setFTasks ] = useState([])

	function filterTasks(tasks, option){
		if(option === 0){
			return tasks.filter(i => i.days.includes(today))
		} else if( option === 1){
			return tasks
		}
	}

	useEffect(() => {
		setFTasks(filterTasks(props.tasks, menuOption))
	}, [menuOption, props.tasks])	

	return (
		<div className="p-4 px-6 pb-6">
			<Header 
				menuOption={menuOption}
				setMenuOption={setMenuOption}
			/>
			{
				props.tasks.length < 1 ?
				<div className="w-fit mx-auto m-6 mt-24 text-gray-300 text-xl flex flex-col gap-2">
					<SparklesIcon className="w-8 h-8" />
					<h1>
						try adding some tasks
					</h1>
				</div>
				:
				<ul>
				{
					ftasks.map(i => <Task key={i.id} {...i} selectedList={props.selectedList} setSelectedList={props.setSelectedList} />)
				}
				</ul>
			}
			<div className="fixed bottom-0 right-0 m-6 flex items-center gap-2">
			{
				props.selectedList.length > 0 ?
				<>
				<button
					className="p-4 bg-red-500 rounded-full text-white"
					onClick={(e) => {
						props.deleteTasks()
					}}
				>
						<TrashIcon className="w-5 h-5" />
				</button>
				<button
					className="p-4 bg-[#111827] rounded-full text-white"
				>
						<PencilIcon className="w-5 h-5" />
				</button>
				<button
					className="p-4 bg-[#111827] rounded-full text-white"
					onClick={(e) => {
						props.setSelectedList([])
					}}
				>
						<XMarkIcon className="w-5 h-5" />
				</button>
				</>
				:
				<button 
					className="p-4 bg-[#111827] rounded-full text-white"
					onClick={(e) => {
						props.setShowAddForm(1)
					}}
				>
					<PlusSmallIcon className="w-6 h-6"/>
				</button>
			}
			</div>
		</div>
	)
}
export default function Squircle({ className }: { className?: string }) {
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 150 150"
      className={className}
    >
      <path
        id="outline"
        d="M75,0C6,0,0,6,0,75s6,75,75,75s75-6,75-75S144,0,75,0z M75,137.5c-57.5,0-62.5-5-62.5-62.5s5-62.5,62.5-62.5
	s62.5,5,62.5,62.5S132.5,137.5,75,137.5z"
      />
      <path
        id="fill"
        d="M25,75c0-46,4-50,50-50s50,4,50,50s-4,50-50,50S25,121,25,75"
      />
    </svg>
  )
}

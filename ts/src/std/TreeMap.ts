/// <reference path="base/UniqueMap.ts" />
/// <reference path="base/MultiMap.ts" />

namespace std
{
	/**
	 * <p> Tree-structured map, <code>std::map</code> of STL. </p>
	 *
	 * <p> {@link TreeMap TreeMaps} are associative containers that store elements formed by a combination of a 
	 * <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), following order. </p>
	 *
	 * <p> In a {@link TreeMap}, the <i>key values</i> are generally used to sort and uniquely identify 
	 * the elements, while the <i>mapped values</i> store the content associated to this key. The types of 
	 * <i>key</i> and <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>, 
	 * which is a {@link Pair} type combining both: </p>
	 *
	 * <p> <code>typedef Pair<Key, T> value_type;</code> </p>
	 *
	 * <p> Internally, the elements in a {@link TreeMap} are always sorted by its <i>key</i> following 
	 * a strict weak ordering criterion indicated by its internal comparison method {@link less}.
	 *
	 * <p> {@link TreeMap} containers are generally slower than {@link HashMap HashMap} containers to 
	 * access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on 
	 * their order. </p>
	 *
	 * <p> {@link TreeMap}s are typically implemented as binary search trees. </p>
	 *
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute 
	 *		 position in the  </dd>
	 * 
	 *	<dt> Ordered </dt>
	 *	<dd> The elements in the container follow a strict order at all times. All inserted elements are 
	 *		 given a position in this order. </dd>
	 *
	 *	<dt> Map </dt>
	 *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>: 
	 *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
	 *
	 *	<dt> Unique keys </dt>
	 *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/map/map/ </li>
	 * </ul>
	 *
	 * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
	 * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class TreeMap<Key, T>
		extends base.UniqueMap<Key, T>
	{
		/**
		 * <i>RB-Tree+</i> object for implemeting the {@link TreeMap}.
		 */
		private tree_: base.PairTree<Key, T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from compare.
		 * 
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(compare: (left: Key, right: Key) => boolean);

		/**
		 * Contruct from elements.
		 *
		 * @param array Elements to be contained.
		 */
		public constructor(array: Array<Pair<Key, T>>);

		/**
		 * Contruct from elements.
		 *
		 * @param array Elements to be contained.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(array: Array<Pair<Key, T>>, compare: (left: Key, right: Key) => boolean);

		/**
		 * Contruct from tuples.
		 *
		 * @param array Tuples to be contained.
		 */
		public constructor(array: Array<[Key, T]>);

		/**
		 * Contruct from tuples.
		 *
		 * @param array Tuples to be contained.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(array: Array<[Key, T]>, compare: (left: Key, right: Key) => boolean);

		/**
		 * Copy Constructor.
		 *
		 * @param container Another map to copy.
		 */
		public constructor(container: base.MapContainer<Key, T>);

		/**
		 * Copy Constructor.
		 *
		 * @param container Another map to copy.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(container: base.MapContainer<Key, T>, compare: (left: Key, right: Key) => boolean);

		/**
		 * Range Constructor.
		 *
		 * @param begin nput interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: MapIterator<Key, T>, end: MapIterator<Key, T>);

		/**
		 * Range Constructor.
		 *
		 * @param begin nput interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor
			(
				begin: MapIterator<Key, T>, end: MapIterator<Key, T>, 
				compare: (left: Key, right: Key) => boolean
			);
		
		public constructor(...args: any[])
		{
			super();

			// CONSTRUCT TREE WITH COMPARE
			let compare: (left: Key, right: Key) => boolean;

			if (args.length == 0 || args[args.length - 1] instanceof Function == false)
				compare = std.less;
			else
				compare = args[args.length - 1];

			this.tree_ = new base.PairTree<Key, T>(compare);

			// OVERLOADINGS
			if (args.length >= 1 && args[0] instanceof Array)
			{
				this.construct_from_array(args[0]);
			}
			else if (args.length >= 1 && args[0] instanceof base.MapContainer)
			{
				this.construct_from_container(args[0]);
			}
			else if (args.length >= 2 && args[0] instanceof MapIterator && args[1] instanceof MapIterator)
			{
				this.construct_from_range(args[0], args[1]);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<L extends Key, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void
		{
			super.assign(begin, end);
		}
		
		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			super.clear();

			this.tree_ = new base.PairTree<Key, T>();
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public find(key: Key): MapIterator<Key, T>
		{
			let node = this.tree_.find(key);

			if (node == null || std.equal_to(node.value.first, key) == false)
				return this.end();
			else
				return node.value;
		}

		/**
		 * <p> Return iterator to lower bound. </p>
		 * 
		 * <p> Returns an iterator pointing to the first element in the container whose key is not considered to 
		 * go before <i>k</i> (i.e., either it is equivalent or goes after). </p>
		 * 
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(<i>k</i>, element_key) would return false. </p>
		 * 
		 * <p> If the {@link TreeMap} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element whose key is not less than <i>k</i> </p>.
		 * 
		 * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except 
		 * in the case that the {@link TreeMap} contains an element with a key equivalent to <i>k</i>: In this 
		 * case, {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} 
		 * returns an iterator pointing to the next element. </p>
		 * 
		 * @param k Key to search for.
		 *
		 * @return An iterator to the the first element in the container whose key is not considered to go before 
		 *		   <i>k</i>, or {@link TreeMap.end} if all keys are considered to go before <i>k</i>.
		 */
		public lower_bound(key: Key): MapIterator<Key, T>
		{
			let node: base.XTreeNode<MapIterator<Key, T>> = this.tree_.find(key);

			if (node == null)
				return this.end();
			else if (std.less(node.value.first, key))
				return node.value.next();
			else
				return node.value;
		}

		/**
		 * <p> Return iterator to upper bound. </p>
		 *
		 * <p> Returns an iterator pointing to the first element in the container whose key is considered to 
		 * go after <i>k</i> </p>.
		 *
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(<i>k</i>, element_key) would return true. </p>
		 *
		 * <p> If the {@link TreeMap} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element whose key is greater than <i>k</i> </p>.
		 *
		 * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except 
		 * in the case that the map contains an element with a key equivalent to <i>k</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} returns an 
		 * iterator pointing to the next element. </p>
		 * 
		 * @param k Key to search for.
		 * 
		 * @return An iterator to the the first element in the container whose key is considered to go after 
		 *		   <i>k</i>, or {@link TreeMap.end} if no keys are considered to go after <i>k</i>.
		 */
		public upper_bound(key: Key): MapIterator<Key, T>
		{
			let node: base.XTreeNode<MapIterator<Key, T>> = this.tree_.find(key);

			if (node == null)
				return this.end();
			else if (!std.equal_to(node.value.first, key) && !std.less(node.value.first, key))
				return node.value;
			else
				return node.value.next();
		}

		/**
		 * <p> Get range of equal elements. </p>
		 * 
		 * <p> Returns the bounds of a range that includes all the elements in the container which have a key 
		 * equivalent to <i>k</i> </p>.
		 * 
		 * <p> Because the elements in a {@link TreeMap} container have unique keys, the range returned will 
		 * contain a single element at most. </p>
		 * 
		 * <p> If no matches are found, the range returned has a length of zero, with both iterators pointing to 
		 * the first element that has a key considered to go after <i>k</i> according to the container's internal 
		 * comparison object (key_comp). </p>
		 * 
		 * <p> Two keys are considered equivalent if the container's comparison object returns false reflexively 
		 * (i.e., no matter the order in which the keys are passed as arguments). </p>
		 * 
		 * @param k Key to search for.
		 *
		 * @return The function returns a {@link Pair}, whose member {@link Pair.first} is the lower bound of 
		 *		   the range (the same as {@link lower_bound}), and {@link Pair.second} is the upper bound 
		 *		   (the same as {@link upper_bound}).
		 */
		public equal_range(key: Key): Pair<MapIterator<Key, T>, MapIterator<Key, T>>
		{
			return new Pair<MapIterator<Key, T>, MapIterator<Key, T>>
				(this.lower_bound(key), this.upper_bound(key));
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected insert_by_pair(pair: Pair<Key, T>): any
		{
			let node = this.tree_.find(pair.first);

			// IF EQUALS, THEN RETURN FALSE
			if (node != null && std.equal_to(node.value.first, pair.first) == true)
				return new Pair<MapIterator<Key, T>, boolean>(node.value, false);
			
			// INSERTS
			let it: MapIterator<Key, T>;

			if (node == null)
				it = this.end();
			else if (std.less(node.value.first, pair.first) == true)
				it = node.value.next();
			else
				it = node.value;

			// ITERATOR TO RETURN
			it = this.insert(it, pair);

			return new Pair<MapIterator<Key, T>, boolean>(it, true);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(item: MapIterator<Key, T>): void
		{
			this.tree_.insert(item);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(item: MapIterator<Key, T>): void
		{
			this.tree_.erase(item);
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * @inheritdoc
		 */
		public swap(obj: base.MapContainer<Key, T>): void
		{
			if (obj instanceof TreeMap)
				this.swap_tree_map(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_tree_map(obj: TreeMap<Key, T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.tree_, obj.tree_] = [obj.tree_, this.tree_];
		}
	}

	/**
	 * <p> Tree-structured multiple-key map. </p>
	 *
	 * <p> {@link TreeMultiMap TreeMultiMaps} are associative containers that store elements formed by a combination of 
	 * a <i>key value</i> and a <i>mapped value</i>, following a specific order, and where multiple elements can 
	 * have equivalent keys. </p>
	 *
	 * <p> In a {@link TreeMultiMap}, the <i>key values</i> are generally used to sort and uniquely identify 
	 * the elements, while the <i>mapped values</i> store the content associated to this <i>key</i>. The types of 
	 * <i>key</i> and <i>mapped value</i> may differ, and are grouped together in member type 
	 * <code>value_type</code>, which is a {@link Pair} type combining both: </p>
	 * 
	 * <p> <code>typedef Pair<const Key, T> value_type;</code> </p>
	 * 
	 * <p> Internally, the elements in a {@link TreeMultiMap}are always sorted by its key following a 
	 * strict weak ordering criterion indicated by its internal comparison method (of {@link less}). </p>
	 *
	 * <p> {@link TreeMultiMap}containers are generally slower than {@link HashMap} containers 
	 * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based 
	 * on their order. </p>
	 *
	 * <p> {@link TreeMultiMap TreeMultiMaps} are typically implemented as binary search trees. </p>
	 *
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> 
	 *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute 
	 *		position in the  
	 *	</dd>
	 * 
	 *	<dt> Ordered </dt>
	 *	<dd> 
	 *		The elements in the container follow a strict order at all times. All inserted elements are 
	 *		given a position in this order. 
	 *	</dd>
	 * 
	 *	<dt> Map </dt>
	 *	<dd> 
	 *		Each element associates a <i>key</i> to a <i>mapped value</i>: 
	 *		<i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. 
	 *	</dd>
	 * 
	 *	<dt> Multiple equivalent keys </dt>
	 *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/map/multimap/ </li>
	 * </ul>
	 *
	 * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
	 * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class TreeMultiMap<Key, T>
		extends base.MultiMap<Key, T>
	{
		private tree_: base.PairTree<Key, T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from compare.
		 * 
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(compare: (left: Key, right: Key) => boolean);

		/**
		 * Contruct from elements.
		 *
		 * @param array Elements to be contained.
		 */
		public constructor(array: Array<Pair<Key, T>>);

		/**
		 * Contruct from elements.
		 *
		 * @param array Elements to be contained.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(array: Array<Pair<Key, T>>, compare: (left: Key, right: Key) => boolean);

		/**
		 * Contruct from tuples.
		 *
		 * @param array Tuples to be contained.
		 */
		public constructor(array: Array<[Key, T]>);

		/**
		 * Contruct from tuples.
		 *
		 * @param array Tuples to be contained.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(array: Array<[Key, T]>, compare: (left: Key, right: Key) => boolean);

		/**
		 * Copy Constructor.
		 *
		 * @param container Another map to copy.
		 */
		public constructor(container: base.MapContainer<Key, T>);

		/**
		 * Copy Constructor.
		 *
		 * @param container Another map to copy.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(container: base.MapContainer<Key, T>, compare: (left: Key, right: Key) => boolean);

		/**
		 * Range Constructor.
		 *
		 * @param begin nput interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: MapIterator<Key, T>, end: MapIterator<Key, T>);

		/**
		 * Range Constructor.
		 *
		 * @param begin nput interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor
			(
			begin: MapIterator<Key, T>, end: MapIterator<Key, T>,
			compare: (left: Key, right: Key) => boolean
			);

		public constructor(...args: any[])
		{
			super();

			// CONSTRUCT TREE WITH COMPARE
			let compare: (left: Key, right: Key) => boolean;

			if (args.length == 0 || args[args.length - 1] instanceof Function == false)
				compare = std.less;
			else
				compare = args[args.length - 1];

			this.tree_ = new base.PairTree<Key, T>(compare);

			// OVERLOADINGS
			if (args.length >= 1 && args[0] instanceof Array)
			{
				this.construct_from_array(args[0]);
			}
			else if (args.length >= 1 && args[0] instanceof base.MapContainer)
			{
				this.construct_from_container(args[0]);
			}
			else if (args.length >= 2 && args[0] instanceof MapIterator && args[1] instanceof MapIterator)
			{
				this.construct_from_range(args[0], args[1]);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<L extends Key, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void
		{
			super.assign(begin, end);
		}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			super.clear();
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public find(key: Key): MapIterator<Key, T>
		{
			let node = this.tree_.find(key);

			if (node == null || std.equal_to(node.value.first, key) == false)
				return this.end();
			else
				return node.value;
		}

		/**
		 * <p> Return iterator to lower bound. </p>
		 * 
		 * <p> Returns an iterator pointing to the first element in the container whose key is not considered to 
		 * go before <i>k</i> (i.e., either it is equivalent or goes after). </p>
		 * 
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(<i>k</i>, element_key) would return false. </p>
		 * 
		 * <p> If the {@link TreeMultiMap} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element whose key is not less than <i>k</i> </p>.
		 * 
		 * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except 
		 * in the case that the {@link TreeMultiMap} contains an element with keys equivalent to <i>k</i>: 
		 * In this case, {@link lower_bound} returns an iterator pointing to the first of such elements, 
		 * whereas {@link upper_bound} returns an iterator pointing to the element following the last. </p>
		 * 
		 * @param k Key to search for.
		 *
		 * @return An iterator to the the first element in the container whose key is not considered to go before 
		 *		   <i>k</i>, or {@link TreeMultiMap.end} if all keys are considered to go before <i>k</i>.
		 */
		public lower_bound(key: Key): MapIterator<Key, T>
		{
			let node: base.XTreeNode<MapIterator<Key, T>> = this.tree_.find(key);

			if (node == null)
				return this.end();
			else if (std.equal_to(node.value.first, key))
				return node.value;
			else
			{
				let it: MapIterator<Key, T> = node.value;
				while (!std.equal_to(it, this.end()) && std.less(it.first, key))
					it = it.next();

				return it;
			}
		}

		/**
		 * <p> Return iterator to upper bound. </p>
		 *
		 * <p> Returns an iterator pointing to the first element in the container whose key is considered to 
		 * go after <i>k</i> </p>.
		 *
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(<i>k</i>, element_key) would return true. </p>
		 *
		 * <p> If the {@link TreeMultiMap} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element whose key is greater than <i>k</i> </p>.
		 *
		 * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except 
		 * in the case that the {@link TreeMultiMap} contains an element with keys equivalent to <i>k</i>: 
		 * In this case {@link lower_bound} returns an iterator pointing to first of such element, whereas 
		 * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
		 * 
		 * @param k Key to search for.
		 * 
		 * @return An iterator to the the first element in the container whose key is considered to go after 
		 *		   <i>k</i>, or {@link TreeMultiMap.end} if no keys are considered to go after <i>k</i>.
		 */
		public upper_bound(key: Key): MapIterator<Key, T>
		{
			let node: base.XTreeNode<MapIterator<Key, T>> = this.tree_.find(key);

			if (node == null)
				return this.end();
			else
			{
				let it: MapIterator<Key, T> = node.value;
				while (!std.equal_to(it, this.end()) && (std.equal_to(it.first, key) || std.less(it.first, key)))
					it = it.next();

				return it;
			}
		}
		
		/**
		 * <p> Get range of equal elements. </p>
		 * 
		 * <p> Returns the bounds of a range that includes all the elements in the container which have a key 
		 * equivalent to <i>k</i> </p>.
		 * 
		 * <p> If no matches are found, the range returned has a length of zero, with both iterators pointing to 
		 * the first element that has a key considered to go after <i>k</i> according to the container's internal 
		 * comparison object (key_comp). </p>
		 * 
		 * <p> Two keys are considered equivalent if the container's comparison object returns false reflexively 
		 * (i.e., no matter the order in which the keys are passed as arguments). </p>
		 * 
		 * @param k Key to search for.
		 *
		 * @return The function returns a {@link Pair}, whose member {@link Pair.first} is the lower bound of 
		 *		   the range (the same as {@link lower_bound}), and {@link Pair.second} is the upper bound 
		 *		   (the same as {@link upper_bound}).
		 */
		public equal_range(key: Key): Pair<MapIterator<Key, T>, MapIterator<Key, T>>
		{
			return new Pair<MapIterator<Key, T>, MapIterator<Key, T>>(this.lower_bound(key), this.upper_bound(key));
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected insert_by_pair(pair: Pair<Key, T>): any
		{
			let node = this.tree_.find(pair.first);
			let it: MapIterator<Key, T>;

			if (node == null)
			{
				it = this.end();
			}
			else if (std.equal_to(node.value.first, pair.first) == true)
			{
				it = node.value.next();
			}
			else if (std.less(node.value.first, pair.first) == true)
			{
				it = node.value.next();

				while (it.equal_to(this.end()) == false && std.less(it.first, pair.first))
					it = it.next();
			}
			else
				it = node.value;

			// ITERATOR TO RETURN
			return this.insert(it, pair);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(item: MapIterator<Key, T>): void
		{
			this.tree_.insert(item);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(item: MapIterator<Key, T>): void
		{
			this.tree_.erase(item);
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * @inheritdoc
		 */
		public swap(obj: base.MapContainer<Key, T>): void
		{
			if (obj instanceof TreeMultiMap)
				this.swap_tree_multimap(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_tree_multimap(obj: TreeMultiMap<Key, T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.tree_, obj.tree_] = [obj.tree_, this.tree_];
		}
	}
}
	arr = []
	t1 = Thread.new{
	  Thread.stop
	  (1..10).each{
		arr << Thread.current.to_s
		#Thread.pass
	  }
	}
	t2 = Thread.new{
	  Thread.stop
	  (1..10).each{ |i|
		arr << Thread.current.to_s
		#Thread.pass
	  }
	}
	puts( "Starting threads..." )
	t1.run
	t2.run
	t1.join
	t2.join
	puts( arr )
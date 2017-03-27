package main
import (
	"net/http"
	"fmt"
	"io/ioutil"
	"time"
	"sync/atomic"
)

var qps uint64 = 0
func get(ch chan<- string) {
	url := "http://127.0.0.1:3000/test"
	resp, err := http.Get(url)
	if err != nil { 
		fmt.Println(err) 
		return 
	}
	defer resp.Body.Close()
	if resp.StatusCode == 200 {
		atomic.AddUint64(&qps, 1)
		body,err := ioutil.ReadAll(resp.Body)
		if err != nil { 
			fmt.Println(err) 
			return 
		}
		//	it will be block
		ch <- string(body)
	}	
}

func loop(ch chan<- string) {
	loop_count := 10
	for j := 0; j < loop_count; j++ { 
		get(ch)
	}
}

func main() {
	count := 10000
	ch := make(chan string)
	for i := 0; i < count; i++ { 
		go get(ch)
	}
	time.Sleep(time.Millisecond * 1000)
	final_qps := atomic.LoadUint64(&qps)
	//	output result
	var k uint64 = 0
	for ; k < final_qps; k++ {
		fmt.Println(<-ch)
		break
	}
	fmt.Println(final_qps)
}

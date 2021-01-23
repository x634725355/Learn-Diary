 import { fetchData, fetchTwoData, fetchThreeData } from "./fetchData.js";

test('fetchData 测试', (done) => {
    fetchData((data) => {
        expect(data).toEqual({
            name: '常做白日梦， 因为你是主人公', 
            title: '任性不冲动， 因为有你的笑容'
        });

        done();
    });
});

test("fetchDataTwo 测试", () => {
    return fetchTwoData().then((response) => {
        expect(response.data).toEqual({
            name: '常做白日梦， 因为你是主人公', 
            title: '任性不冲动， 因为有你的笑容'
        });

    });
});

test("fetchDataThree 测试", () => {
    expect.assertions(1) // 断言，必须执行一次expect

    return fetchThreeData().catch((e) => {
        expect(e.toString().indexOf('404') > -1).toBe(true);
    });
});

test("FetchFourData 测试", async () => {
    // resolves 把现有对象转换成Promise对象
    // toMatchObjective 匹配对象中的属性
    await expect(fetchTwoData()).resolves.toMatchObject({
        data: {
            name: '常做白日梦， 因为你是主人公', 
            title: '任性不冲动， 因为有你的笑容'
        }
    })
});

test("FetchFourData 测试",async () => {
    const response = await fetchTwoData();
    expect(response.data).toEqual({
        name: '常做白日梦， 因为你是主人公', 
        title: '任性不冲动， 因为有你的笑容'
    });
});




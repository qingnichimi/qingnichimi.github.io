---
title: 'SpringBoot单元测试示例'
date: '2025-12-09'
description: 'Java'
---
# SpringBoot单元测试
## Maven依赖
```xml
        <!-- ========= JUnit5 ========= -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <!-- 排除 junit4，避免冲突 -->
                <exclusion>
                    <groupId>junit</groupId>
                    <artifactId>junit</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

        <!-- ========= Mockito 扩展：Mock 静态方法========= -->
        <dependency>
            <groupId>org.mockito</groupId>
            <artifactId>mockito-inline</artifactId>
            <scope>test</scope>
        </dependency>

```

## Controller示例
```java

@WebMvcTest(DemoController.class)
class DemoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IDemoService demoService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetDetail() throws Exception {
        Demo demo = new Demo();
        demo.setId("123");
        demo.setName("测试台账");

        Mockito.when(demoService.selectDemoById("123"))
                .thenReturn(demo);

        mockMvc.perform(get("/demo/123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("123"))
                .andExpect(jsonPath("$.name").value("测试台账"));
    }


    @Test
    void testAdd() throws Exception {
        Demo demo = new Demo();
        demo.setName("新增测试");

        Mockito.when(demoService.insertDemo(any()))
                .thenReturn(1);

        mockMvc.perform(post("/demo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(demo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data").value(1));
    }


    @Test
    void testEdit() throws Exception {
        Demo demo = new Demo();
        demo.setId("123");
        demo.setName("修改后");

        Mockito.when(demoService.updateDemo(any()))
                .thenReturn(1);

        mockMvc.perform(put("/demo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(demo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value(1));
    }


    @Test
    void testDelete() throws Exception {
        Mockito.when(demoService.deleteDemoById("123"))
                .thenReturn(1);

        mockMvc.perform(delete("/demo/123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value(1));
    }
}
```
## Service示例
```java

@ExtendWith(MockitoExtension.class)
class DemoServiceImplTest {

    @InjectMocks
    private DemoServiceImpl service;

    @Mock
    private DemoMapper mapper;

    // mock static
    private MockedStatic<DateUtils> dateUtilsMock;
    private MockedStatic<SecurityUtils> securityUtilsMock;
    private MockedStatic<IdUtils> idUtilsMock;

    @BeforeEach
    void setUp() {
        dateUtilsMock = mockStatic(DateUtils.class);
        securityUtilsMock = mockStatic(SecurityUtils.class);
        idUtilsMock = mockStatic(IdUtils.class);
    }

    @Test
    void testSelectById() {
        Demo demo = new Demo();
        when(mapper.selectDemoById("1")).thenReturn(demo);

        Demo result = service.selectDemoById("1");
        assertEquals(demo, result);
    }

    @Test
    void testSelectList() {
        Demo param = new Demo();
        List<Demo> list = Arrays.asList(new Demo());

        when(mapper.selectDemoList(param)).thenReturn(list);

        List<Demo> result = service.selectDemoList(param);
        assertEquals(1, result.size());
    }

    @Test
    void testInsert() {
        Demo demo = new Demo();

        Date now = new Date();
        dateUtilsMock.when(DateUtils::getNowDate).thenReturn(now);
        securityUtilsMock.when(SecurityUtils::getUserId).thenReturn(123L);

        // Mock UUID
        idUtilsMock.when(IdUtils::simpleUUID).thenReturn("UUID123");

        when(mapper.insertDemo(any())).thenReturn(1);

        int r = service.insertDemo(demo);

        assertEquals(1, r);
        assertEquals(now, demo.getCreateTime());
        assertEquals("tester", demo.getCreateUname());
        assertEquals(123L, demo.getCreateUid());
        assertEquals("UUID123", demo.getId());

        verify(mapper).insertDemo(demo);
    }

    @Test
    void testUpdate() {
        Demo demo = new Demo();

        Date now = new Date();
        dateUtilsMock.when(DateUtils::getNowDate).thenReturn(now);
        securityUtilsMock.when(SecurityUtils::getUserId).thenReturn(123L);

        when(mapper.updateDemo(any())).thenReturn(1);

        int r = service.updateDemo(demo);

        assertEquals(1, r);
        assertEquals(now, demo.getUpdateTime());
        assertEquals("tester", demo.getUpdateUname());
        assertEquals(123L, demo.getUpdateUid());

        verify(mapper).updateDemo(demo);
    }

    @Test
    void testDeleteByIds() {
        when(mapper.deleteDemoByIds(new String[]{"1", "2"})).thenReturn(2);

        int r = service.deleteDemoByIds(new String[]{"1", "2"});
        assertEquals(2, r);
    }

    @Test
    void testDeleteById() {
        when(mapper.deleteDemoById("1")).thenReturn(1);

        int r = service.deleteDemoById("1");
        assertEquals(1, r);
    }
}
```
## Mapper示例
```java
@ExtendWith(MockitoExtension.class)
class DemoMapperMockTest {

    @Mock
    private DemoMapper mapper;

    @Test
    void testMockSelectById() {
        Demo demo = new Demo();
        demo.setId("1");

        when(mapper.selectDemoById("1")).thenReturn(demo);

        Demo result = mapper.selectDemoById("1");

        assertEquals("1", result.getId());
    }
}
```
import { createVue, destroyVM } from '../util';

describe('Timeline.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('create', done => {
    vm = createVue(`
        <Timeline>
            <Timeline-item>
                <p class="time">1976年</p>
                <p class="content">Apple I 问世</p>
            </Timeline-item>
            <Timeline-item>
                <p class="time">1984年</p>
                <p class="content">发布 Macintosh</p>
            </Timeline-item>
            <Timeline-item>
                <p class="time">2007年</p>
                <p class="content">发布 iPhone</p>
            </Timeline-item>
            <Timeline-item>
                <p class="time">2010年</p>
                <p class="content">发布 iPad</p>
            </Timeline-item>
            <Timeline-item>
                <p class="time">2011年10月5日</p>
                <p class="content">史蒂夫·乔布斯去世</p>
            </Timeline-item>
        </Timeline>
    `);
    expect(vm.$el.querySelectorAll('.ivu-timeline').length).to.equal(1);

    vm.$nextTick(_ => {
      // console.log(vm.$el.querySelector('.ivu-breadcrumb-item-separator').innerHTML);
      expect(vm.$el.querySelector('.ivu-timeline').innerHTML).to.equal('<b class="ivu-timeline">=&gt;</b>');
      done();
    });
  });
});

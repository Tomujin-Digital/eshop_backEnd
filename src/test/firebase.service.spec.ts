import {Test, TestingModule} from "@nestjs/testing"


describe("something", () => {
  jest.mock("firebase-admin")
  // let battleService: BattleService
  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [AppModule],
    // }).compile()
    // fireInitApp()

    // battleService = module.get<BattleService>(BattleService);
  })

  it("should be true", () => {
    let userCount = 4;
    let totalRound = 0
    let sessions:any = []

    const sessionCreate = async(count: number) => {
      if(count <= 1) return;
      let numberOfSession = Math.floor(count/2)
      
      let sessionok = Array.from({length: numberOfSession == 0 ? 1 : numberOfSession});
      sessionok = sessionok.fill({
        winner: "",
        elapsedTime: 0,
        round: totalRound,
        users: [],
        status: "waiting",
        nextRound: totalRound+1,
      })

      console.log(sessionok.length)
      if(numberOfSession != 0) sessions.push(numberOfSession)
      else sessions.push(1) 
      totalRound++;
      await sessionCreate(count/2);
    }
    sessionCreate(userCount)
    console.log(sessions.length)
    expect(totalRound).toBe(sessions.length)
  })
})
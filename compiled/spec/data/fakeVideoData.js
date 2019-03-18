// A simplified version of `exampleVideoData` to use for tests
window.fakeVideoData = [{
  etag: 'L332gQTY',
  id: {
    videoId: '000001'
  },
  snippet: {
    title: 'Cute cat video',
    description: 'The best cat video on the internet!',
    thumbnails: {
      default: {
        url: 'http://www.fndvisions.org/img/cutecat.jpg'
      }
    }
  }
}, {
  etag: 'SmEuSYxg',
  id: {
    videoId: '000002'
  },
  snippet: {
    title: 'Super cute cat video',
    description: 'Better than the best cat video on the internet!',
    thumbnails: {
      default: {
        url: 'https://pbs.twimg.com/profile_images/567285191169687553/7kg_TF4l.jpeg'
      }
    }
  }
}, {
  etag: 'ujBKBmLk',
  id: {
    videoId: '000003'
  },
  snippet: {
    title: 'Hack Reactor opens extension school on Mars',
    description: 'Watch the ribbon cutting of the first coding bootcamp in space',
    thumbnails: {
      default: {
        url: 'https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/14/hack_reactor.png'
      }
    }
  }
}, {
  etag: 'Nj7xszf8',
  id: {
    videoId: '000004'
  },
  snippet: {
    title: 'JavaScript Jamz',
    description: 'Rock on with JavaScript remixes of today\'s top songs',
    thumbnails: {
      default: {
        url: 'http://3.bp.blogspot.com/-PTty3CfTGnA/TpZOEjTQ_WI/AAAAAAAAAeo/KeKt_D5X2xo/s1600/js.jpg'
      }
    }
  }
}, {
  etag: 'I2w-7nRI',
  id: {
    videoId: '000005'
  },
  snippet: {
    title: 'Framework fatigue and you',
    description: 'JS guru, @McKringleberry teaches tips and tricks for managing JS framework fatigue',
    thumbnails: {
      default: {
        url: 'https://facebook.github.io/react/img/logo.svg'
      }
    }
  }
}];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NwZWMvZGF0YS9mYWtlVmlkZW9EYXRhLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImZha2VWaWRlb0RhdGEiLCJldGFnIiwiaWQiLCJ2aWRlb0lkIiwic25pcHBldCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJ0aHVtYm5haWxzIiwiZGVmYXVsdCIsInVybCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQUEsT0FBT0MsYUFBUCxHQUF1QixDQUFDO0FBQ3RCQyxRQUFNLFVBRGdCO0FBRXRCQyxNQUFJO0FBQ0ZDLGFBQVM7QUFEUCxHQUZrQjtBQUt0QkMsV0FBUztBQUNQQyxXQUFPLGdCQURBO0FBRVBDLGlCQUFhLHFDQUZOO0FBR1BDLGdCQUFZO0FBQ1ZDLGVBQVM7QUFDUEMsYUFBSztBQURFO0FBREM7QUFITDtBQUxhLENBQUQsRUFjcEI7QUFDRFIsUUFBTSxVQURMO0FBRURDLE1BQUk7QUFDRkMsYUFBUztBQURQLEdBRkg7QUFLREMsV0FBUztBQUNQQyxXQUFPLHNCQURBO0FBRVBDLGlCQUFhLGlEQUZOO0FBR1BDLGdCQUFZO0FBQ1ZDLGVBQVM7QUFDUEMsYUFBSztBQURFO0FBREM7QUFITDtBQUxSLENBZG9CLEVBNEJwQjtBQUNEUixRQUFNLFVBREw7QUFFREMsTUFBSTtBQUNGQyxhQUFTO0FBRFAsR0FGSDtBQUtEQyxXQUFTO0FBQ1BDLFdBQU8sNkNBREE7QUFFUEMsaUJBQWEsZ0VBRk47QUFHUEMsZ0JBQVk7QUFDVkMsZUFBUztBQUNQQyxhQUFLO0FBREU7QUFEQztBQUhMO0FBTFIsQ0E1Qm9CLEVBMENwQjtBQUNEUixRQUFNLFVBREw7QUFFREMsTUFBSTtBQUNGQyxhQUFTO0FBRFAsR0FGSDtBQUtEQyxXQUFTO0FBQ1BDLFdBQU8saUJBREE7QUFFUEMsaUJBQWEsdURBRk47QUFHUEMsZ0JBQVk7QUFDVkMsZUFBUztBQUNQQyxhQUFLO0FBREU7QUFEQztBQUhMO0FBTFIsQ0ExQ29CLEVBd0RwQjtBQUNEUixRQUFNLFVBREw7QUFFREMsTUFBSTtBQUNGQyxhQUFTO0FBRFAsR0FGSDtBQUtEQyxXQUFTO0FBQ1BDLFdBQU8sMkJBREE7QUFFUEMsaUJBQWEsb0ZBRk47QUFHUEMsZ0JBQVk7QUFDVkMsZUFBUztBQUNQQyxhQUFLO0FBREU7QUFEQztBQUhMO0FBTFIsQ0F4RG9CLENBQXZCIiwiZmlsZSI6ImZha2VWaWRlb0RhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBIHNpbXBsaWZpZWQgdmVyc2lvbiBvZiBgZXhhbXBsZVZpZGVvRGF0YWAgdG8gdXNlIGZvciB0ZXN0c1xud2luZG93LmZha2VWaWRlb0RhdGEgPSBbe1xuICBldGFnOiAnTDMzMmdRVFknLFxuICBpZDoge1xuICAgIHZpZGVvSWQ6ICcwMDAwMDEnXG4gIH0sXG4gIHNuaXBwZXQ6IHtcbiAgICB0aXRsZTogJ0N1dGUgY2F0IHZpZGVvJyxcbiAgICBkZXNjcmlwdGlvbjogJ1RoZSBiZXN0IGNhdCB2aWRlbyBvbiB0aGUgaW50ZXJuZXQhJyxcbiAgICB0aHVtYm5haWxzOiB7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHVybDogJ2h0dHA6Ly93d3cuZm5kdmlzaW9ucy5vcmcvaW1nL2N1dGVjYXQuanBnJyxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0sIHtcbiAgZXRhZzogJ1NtRXVTWXhnJyxcbiAgaWQ6IHtcbiAgICB2aWRlb0lkOiAnMDAwMDAyJ1xuICB9LFxuICBzbmlwcGV0OiB7XG4gICAgdGl0bGU6ICdTdXBlciBjdXRlIGNhdCB2aWRlbycsXG4gICAgZGVzY3JpcHRpb246ICdCZXR0ZXIgdGhhbiB0aGUgYmVzdCBjYXQgdmlkZW8gb24gdGhlIGludGVybmV0IScsXG4gICAgdGh1bWJuYWlsczoge1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB1cmw6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNTY3Mjg1MTkxMTY5Njg3NTUzLzdrZ19URjRsLmpwZWcnLFxuICAgICAgfVxuICAgIH1cbiAgfVxufSzCoHtcbiAgZXRhZzogJ3VqQktCbUxrJyxcbiAgaWQ6IHtcbiAgICB2aWRlb0lkOiAnMDAwMDAzJ1xuICB9LFxuICBzbmlwcGV0OiB7XG4gICAgdGl0bGU6ICdIYWNrIFJlYWN0b3Igb3BlbnMgZXh0ZW5zaW9uIHNjaG9vbCBvbiBNYXJzJyxcbiAgICBkZXNjcmlwdGlvbjogJ1dhdGNoIHRoZSByaWJib24gY3V0dGluZyBvZiB0aGUgZmlyc3QgY29kaW5nIGJvb3RjYW1wIGluIHNwYWNlJyxcbiAgICB0aHVtYm5haWxzOiB7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vZDNjNXMxaG1rYTJlMmIuY2xvdWRmcm9udC5uZXQvdXBsb2Fkcy90b3BpYy9pbWFnZS8xNC9oYWNrX3JlYWN0b3IucG5nJyxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0swqB7XG4gIGV0YWc6ICdOajd4c3pmOCcsXG4gIGlkOiB7XG4gICAgdmlkZW9JZDogJzAwMDAwNCdcbiAgfSxcbiAgc25pcHBldDoge1xuICAgIHRpdGxlOiAnSmF2YVNjcmlwdCBKYW16JyxcbiAgICBkZXNjcmlwdGlvbjogJ1JvY2sgb24gd2l0aCBKYXZhU2NyaXB0IHJlbWl4ZXMgb2YgdG9kYXlcXCdzIHRvcCBzb25ncycsXG4gICAgdGh1bWJuYWlsczoge1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB1cmw6ICdodHRwOi8vMy5icC5ibG9nc3BvdC5jb20vLVBUdHkzQ2ZUR25BL1RwWk9FalRRX1dJL0FBQUFBQUFBQWVvL0tlS3RfRDVYMnhvL3MxNjAwL2pzLmpwZycsXG4gICAgICB9XG4gICAgfVxuICB9XG59LMKge1xuICBldGFnOiAnSTJ3LTduUkknLFxuICBpZDoge1xuICAgIHZpZGVvSWQ6ICcwMDAwMDUnXG4gIH0sXG4gIHNuaXBwZXQ6IHtcbiAgICB0aXRsZTogJ0ZyYW1ld29yayBmYXRpZ3VlIGFuZCB5b3UnLFxuICAgIGRlc2NyaXB0aW9uOiAnSlMgZ3VydSwgQE1jS3JpbmdsZWJlcnJ5IHRlYWNoZXMgdGlwcyBhbmQgdHJpY2tzIGZvciBtYW5hZ2luZyBKUyBmcmFtZXdvcmsgZmF0aWd1ZScsXG4gICAgdGh1bWJuYWlsczoge1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB1cmw6ICdodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9pbWcvbG9nby5zdmcnLFxuICAgICAgfVxuICAgIH1cbiAgfVxufV07XG4iXX0=
import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
   try {
    // -1 = descending the newest one is the oldest one
    // 1 = Ascending the oldest one is the newest one
     const songs = await Song.find().sort({createdAt : -1})
     res.status(200).json(songs);
   } catch (error) {
    console.log("Error in the getAll song controller", error);
    next(error)
   }
}

export const getFeaturedSongs = async (req,res,next) => {
    try {
        // fetch 6 random songs using mongodb's aggregation pipeline
       const songs = await Song.aggregate([
        {
            $sample:{size:6}
        },
        {
            $project:{
               _id:1,
               title:1,
               artist:1,
               imageUrl:1,
               audioUrl:1 
            }
        }
       ])

       res.status(200).json(songs);
    } catch (error) {
         next(error);
    }
}

export const getMadeForYou = async (req,res,next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.status(200).json(songs);
    } catch (error) {
        console.log("Error in the getMadeForYou controller : ", error)
        next(error);
    }
}

export const getTrendingSongs = async (req,res,next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample:{size:6}
            },
            {
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        // console.log( "Hello bro the songs are below:  " , songs);
        res.status(200).json(songs);
    } catch (error) {
        console.log("Error in the getMadeForYou controller : ", error)
        next(error);
    }
}

// export const getTrendingSongs = async (req,res,next) => {
//     try {
//         const songs = await Song.aggregate([
//             {
//                 $sample:{size:6}
//             },
//             {
//                 $project:{
//                     _id:1,
//                     title:1,
//                     imageUrl:1,
//                     audioUrl:1,
//                     artist:1
//                 }
//             }
//         ])
//         res.status(200).json(songs);
//     } catch (error) {
//        console.log("Error in the getTrendingSongs controller ", error);
//        next(error) 
//     }
// }